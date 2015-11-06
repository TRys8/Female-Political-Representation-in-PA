# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import csv
filename = r"C:\Users\TRyan\Documents\Code for Philly\Women's Political Representation\Women Representation Data.csv"

data = []

with open(filename) as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data.append(row)
   
datakey = {}   
   
filenamekey = r"C:\Users\TRyan\Documents\Code for Philly\Women's Political Representation\womenspoliticalrepresentationkey.csv"

with open(filenamekey) as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        fieldname = row["fieldname"]
        if fieldname not in datakey:
            datakey[fieldname] = {}
        datakey[fieldname][row["key"]] = row["value"]
        
cleandata = []

for row in data:

    cleanrow = {}    
    
    for fieldname in row:
        if fieldname in datakey:
            key = row[fieldname]
            cleanrow[fieldname] = datakey[fieldname][key]
        else:
            cleanrow[fieldname] = row[fieldname]
    
    cleandata.append(cleanrow)
    

    

        