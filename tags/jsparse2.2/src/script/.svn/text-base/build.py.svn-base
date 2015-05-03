#!/usr/bin/python
# Filename: build.py

df = file("domTree.js" , "w");

fs = ['x-variable.js' , 'x-common.js' , 'x-rule.js' , 'x-parse.js' ,\
'x-reader.js' , 'x-domtree.js'];

for item in fs:
	f = file(item , "r");
	for line in f:
		df.write(line)
	df.write("\n")
df.close()



