sass wwwroot-src/sass/index.scss:wwwroot/css/site.css &&^
mkdir .\wwwroot\static &&^
xcopy /Y /E /I /Q /G /H /R .\wwwroot-src\static\*.* .\wwwroot\static\*.* &&^
copy .\wwwroot-src\favicon.ico .\wwwroot\favicon.ico 