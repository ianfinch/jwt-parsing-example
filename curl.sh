#!/bin/bash

if [[ "$2" == "" ]] ; then
    /bin/curl --silent --show-error --dump - $1 | jq -R -r '. as $line | try fromjson catch $line'
elif [[ "$3" == "" ]] ; then
    /bin/curl --silent --show-error --dump - $1 $2 | jq -R -r '. as $line | try fromjson catch $line'
elif [[ "$4" == "" ]] ; then
    /bin/curl --silent --show-error --dump - $1 "$2" $3 | jq -R -r '. as $line | try fromjson catch $line'
else
    echo "Cannot handle parameters: $*"
fi
