# Dockerfile
# Project: fe_yinht
# Author: guangzhen.ming
# Email: mingguangzhen@kingsoft.com
# docker build --no-cache -t fe_yinht:latest .
# docker run --rm -v /home/mingguangzhen/kscrcdn_ng/html/fe_kscrcdn:/data --name fe_kscrcdn fe_kscrcdn:latest
FROM node:12
LABEL maintainer="dxzxomy@163.com"

COPY . $WORKDIR/fe_yinht/
WORKDIR /fe_yinht

RUN npm install --registry=https://registry.npm.taobao.org && \
    npm run build:prod

CMD ["cp", "-rp", "/fe_yinht/dist/.", "/data/"]
