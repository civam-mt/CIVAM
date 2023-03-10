## Thanks to https://www.geeksforgeeks.org/convert-csv-to-json-using-python/

import csv
import getopt
import json
import sys

INFO = '[INFO] '
EROR = '[ERROR] '
WARN = '[WARNING] '
TABS = '    '
CMD_USAGE = TABS + 'csv_to_json.py -i <inputFile> -o <outputFile> [-h|-v]'

def main(argv):
    inputFile = ''
    outputFile = ''
    fileEncoding = 'utf-8'
    indent = 4
    verbose = False
    fileWarn = False
    try:
        opts, args = getopt.getopt(argv, 'i:o:e:vh',['ifile=', 'ofile=', 'encode=', 'verb'])
    except getopt.GetoptError:
        print(CMD_USAGE)
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print(TABS + 'Help ...')
            print(CMD_USAGE)
            print('')
            print(TABS + '-i/--infile      Input File, path to input csv')
            print(TABS + '-o/--ofile       Output File, path to output json')
            print(TABS + '-e/--encode      File encoding, default is \'utf-8\'')
            print(TABS + '-v/--verb        Verbose Mode, will output much text')
            sys.exit(1)
        elif opt in ("-i", "--ifile"):
            inputFile = arg
        elif opt in ("-o", "--ofile"):
            if arg.endswith('.json'):
                outputFile = arg
            else:
                outputFile = arg + '.json'
                fileWarn = True
        elif opt in ("-e", "--encode"):
            fileEncoding = arg
        elif opt in ("-v", "--verb"):
            verbose = True
    if verbose:
        print( INFO + 'Verbose Mode Activated')
        print( INFO + 'Input file is ' + inputFile)
        print( INFO + 'Output file is ' + outputFile)
        if fileWarn:
            print( WARN + 'No output file extension provided, defaulting to')
            print( TABS + TABS + TABS + '.json.')
    make_json(inputFile, outputFile, fileEncoding, indent)
    
def make_json(csvFilePath, jsonFilePath, encoding, indent):

    #data dictionary
    data = {}

    #open csv reader
    try:
        with open(csvFilePath, encoding=encoding) as csvf:
            csvReader = csv.DictReader(csvf, ['continent', 'country', 'province', 'name', 'city', 'crow_material', 'arcgis', 'lat', 'lng', 'link', 'contact', 'history', 'digital_collection', 'number_objects', 'replied', 'obj_photo_both', 'notes', 'misc'])

            counter = 0
            # Convert each row into a dictionary
            # and add it to data
            for row in csvReader:
                data[counter] = row
                counter = counter + 1            
    except FileNotFoundError:
        print(EROR + "File " + csvFilePath + " could not be opened.  Does this file exist?")
        sys.exit(2)
    except PermissionError:
        print(EROR + "Does not have permissions to access the file.")
        sys.exit(2)
    except csv.Error as e:
        print('{}File {}, line {}: {}'.format(EROR, csvFilePath, csvReader.line_num, e))
        sys.exit(e)
    
    try:
        with open(jsonFilePath, 'w', encoding=encoding) as jsonf:
            jsonf.write(json.dumps(data, indent=indent))
    except FileExistsError:
        print(EROR + "Cannot write file " + jsonFilePath + " as a file with that name already exists!")
        sys.exit(2)
        
        
if __name__ == "__main__":
    main(sys.argv[1:])
