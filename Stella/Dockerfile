FROM riz4d/stella:test

RUN git clone https://github.com/riz4d/stella/ /skl/stella
WORKDIR /skl/raganork 
ENV TZ = Asia/Kolkata
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "stella.js"]
