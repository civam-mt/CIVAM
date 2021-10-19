#sends an email to Cindy when free disk percentage is greater than a set threshold, currently set to 80%
#cron config: 0 0 * * * ~/CIVAM/utils/disk_email.py
import subprocess
import smtplib
import os
from email.mime.text import MIMEText

threshold = 80 #when the disk space percentage is greater than this, an email will be sent.
partition = "/"

def report_via_email():
    recipients = ["cott@udel.edu", "silber@udel.edu"]
    msg = MIMEText("The civam site server is almost out of storage space. This WILL result in permanent data loss if not addressed. Please contact Greg Silber at silber@udel.edu to address this issue immediately. Please do not add any more media to the site until this issue has been resolved")
    msg["Subject"] = "WARNING! CIVAM DISK SPACE IS RUNNING OUT!"
    msg["From"] = "civamdiskusage@gmail.com"
    msg["To"] = ",".join(recipients)

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.ehlo()
        server.starttls()
        server.login("civamdiskusage@gmail.com","c1vam-MONT")   
        server.sendmail("civamdiskusage@gmail.com",recipients,msg.as_string())

def check_once():
    try:
        df = subprocess.Popen(["df","-h"], stdout=subprocess.PIPE) #uses df -h as a CLI to get percentage of free space, sends a message on server if fails
        for line in df.stdout:
            splitline = line.decode().split()
            if splitline[5] == partition:
                if int(splitline[4][:-1]) > threshold:
                    report_via_email()
    except FileNotFoundError:
        cmd = "wall Warning! DF has failed within email script!"
        os.system(cmd)
check_once()
