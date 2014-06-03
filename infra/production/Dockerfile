FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -q -y update
RUN apt-get -q -y install python

ADD ./infra/production/docker.sh /docker.sh

ADD . /src
WORKDIR /src

EXPOSE 3000

RUN chmod +x /docker.sh

ENTRYPOINT ["/docker.sh"]