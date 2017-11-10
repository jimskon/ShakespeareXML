# For CSC3004 Software Development

# Put your user name below:
USER= skon

CC= g++

#For Optimization
#CFLAGS= -O2
#For debugging
CFLAGS= -std=c++11

RM= /bin/rm -f

all: PutFiles

PutFiles:
	cp shakeWords.html /var/www/html/class/softdev/$(USER)/shakeWords/
	cp shakeWords.js /var/www/html/class/softdev/$(USER)/shakeWords/
	cp shakeCount.html /var/www/html/class/softdev/$(USER)/shakeWords/
	cp shakeCount.js /var/www/html/class/softdev/$(USER)/shakeWords/
	cp shakeBar.html /var/www/html/class/softdev/$(USER)/shakeWords/
	cp shakeBar.js /var/www/html/class/softdev/$(USER)/shakeWords/
	cp shakeCloud.html /var/www/html/class/softdev/$(USER)/shakeWords/
	cp shakeCloud.js /var/www/html/class/softdev/$(USER)/shakeWords/
	cp stop.txt /var/www/html/class/softdev/$(USER)/shakeWords/

	echo "Current contents of your HTML directory: "
	ls -l /var/www/html/class/softdev/$(USER)/shakeWords

