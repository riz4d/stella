FROM fusuf/whatsasena:latest

RUN git clone https://github.com/riz4d/stella /skl/stella
WORKDIR /skl/stella
ENV TZ=Asia/Kolkata
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "index.js"]
