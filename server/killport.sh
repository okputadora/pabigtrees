# value = netstat -o -n -a | findstr 0.0:4000
# echo $value
# # FOR /F "tokens=4 delims= " %%P IN ('netstat -a -n -o ^| findstr :4000') DO @ECHO TaskKill.exe /PID %%P
processId=`netstat -ano | findstr :4000`
echo $processId
var=$!
echo $var|