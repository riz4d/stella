FROM fusuf/whatsasena:latest

RUN git clone https://github.com/riz4d/stella /root/stella
WORKDIR /root/stella/
ENV TZ=America/New_York
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
