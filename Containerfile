FROM denoland/deno:latest
 
WORKDIR /app
 
EXPOSE 8080
 
ENTRYPOINT ["deno", "run", "-A". "jsr:@simonneutert/quickblog", "build"]
