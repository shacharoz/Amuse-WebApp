for file in $(ls ./.tmp/localDiskDb/*.db | grep -v clean); do
  echo $file
  head -1 $file > $file
done
