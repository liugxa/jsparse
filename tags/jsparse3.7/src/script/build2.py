#!/usr/bin/python
# Filename: build.py

import fileinput
df = file("domtree.js" , "w");

#fs = ['x-variable.js' , 'x-common.js' , 'x-rule.js' , 'x-parse.js' ,\
#'x-context.js' , 'x-domtree.js']

fs = fileinput.FileInput(['x-variable.js' , 'x-common.js' , 'x-rule.js' , 'x-parse.js' ,\
'x-context.js' , 'x-domtree.js'])

for line in fs:
	df.write(line)
df.write("\n")
df.close()




