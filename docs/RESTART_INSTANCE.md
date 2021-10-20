# Instructions For Restarting the CIVAM AWS instance

### Introduction

Due to the fact that AWS dynamically assigns an IP address to a given EC2 instance upon 
instantiation, if any system action is taken other than a simple reboot, the instance is 
provisioned with a new IP address. This impacts the DNS for the site, and we must create 
a new record so that the domain name points to the correct IP address. Note that I have not
included direct links in this guide; this is because the AWS console interface and 
associated links change frequently.

### Steps

 1. Perform the sytem action (shutdown, etc.). Bring the server back up and make a note
  of the public IP address.

 2. Navigate to Route 53 within the AWS console. This is most easily achieved by using
    the search bar at the top of the AWS console. Route 53 is Amazon's cloud domain name
    system that handles the traslation from `https://civam-mt.org/home` to whatever IP
    address that the civam site is assigned to by AWS.

 3. Navigate to "Hosted zones". There you will see `civam-mt.org`. Click on it.

 4. The first entry in the record table should be `civam-mt.org` select the checkbox. Note
    that this is a DNS "A" record. Edit this entry by replacing the existing the IP address
    with the one that you got from the EC2 console.

 5. Save the changes that you've made to the record.

 6. You may have to wait a minute or two before the changes take effect, but after this
    process is complete, you should be able to navigate to https://civam-mt.org/home and
    see the site.

 