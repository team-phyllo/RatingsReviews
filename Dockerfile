# Use the official image as a parent image.
FROM node:15

# Set the working directory.
WORKDIR /Users/sofia/Cohort/sdc/RatingsReviews

# Copy the file from your host to your current location.
COPY package.json .

# Run the command inside your image filesystem.
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 3030

# Run the specified command within the container.
CMD [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .