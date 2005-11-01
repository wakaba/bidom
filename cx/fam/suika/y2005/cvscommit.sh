#!/bin/sh
find -name ChangeLog | xargs cvs diff -u | grep "^\+" | sed -e "s/^\+//; s/^\+\+ .\/\
/++ cx\/fam\/suika\/y2005\//" > .cvslog.tmp
cvs commit -F .cvslog.tmp $1 $2 $3 $4 $5 $6 $7 $8 $9
rm .cvslog.tmp

## $Date: 2005/11/01 10:39:00 $
## License: Public Domain
