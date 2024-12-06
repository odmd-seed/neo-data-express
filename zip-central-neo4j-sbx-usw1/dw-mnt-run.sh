#!/bin/bash

set -ex


# Variables (Replace these with your own values)
BUCKET_NAME="odmd-central-artifact-centralartuswest159018403179-jmsozai1plyf"

#FILE_KEY="neo4j-dump/590184031795-5bc391018c41f2897e89c532e14cdd7aa8fb9777.tar.gz"
FILE_KEY="neo4j-dump/590184031795-38145cd6cdef04f2259b41f7bae51978fa32d5c8.tar.gz"
DOWNLOAD_PATH="downloaded"  # Local path where the tar will be downloaded
EXTRACT_PATH="extracted"    # Folder to extract the tar contents
Neo_container_name="neo4jCentralRestored"

docker rm $Neo_container_name || echo "container: $Neo_container_name not found"
rm -rf $EXTRACT_PATH ||  echo "path: $EXTRACT_PATH not found"

# Create download and extract directories
mkdir -p "$DOWNLOAD_PATH"
mkdir -p "$EXTRACT_PATH"

# Download the file from S3
echo "Downloading $FILE_KEY from S3 bucket $BUCKET_NAME..."
aws s3 cp "s3://$BUCKET_NAME/$FILE_KEY" "$DOWNLOAD_PATH/$FILE_KEY" --profile sandbox-central

# Extract the tar file
echo "Extracting $FILE_KEY to $EXTRACT_PATH..."
tar -xvf "$DOWNLOAD_PATH/$FILE_KEY" -C "$EXTRACT_PATH"

#
#docker run -d \
#    --name $Neo_container_name \
#    -v "$(pwd)/$EXTRACT_PATH":/data \
#    -p 7574:7474 \
#    -p 7587:7687 \
#    -e NEO4J_AUTH=none \
#    neo4j:5.22
