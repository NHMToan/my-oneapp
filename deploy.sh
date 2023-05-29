
echo "Deploying files to server..."
scp -r build/* root@45.32.100.27:/var/www/vsg/frontend

echo "Done!"