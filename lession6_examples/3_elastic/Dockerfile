FROM elasticsearch:8.17.0

ENV discovery.type=single-node
ENV ES_JAVA_OPTS="-Xms1g -Xmx1g"
ENV xpack.security.enabled=true
ENV cluster.name=elastic-cluster-1

# override default user and password for superuser
ENV ELASTIC_USERNAME=elastic
ENV ELASTIC_PASSWORD=elastic

# if we use kibana
ENV KIBANA_SYSTEM_PASSWORD=kibana_system



USER root
# RUN elasticsearch-users useradd kibana_system -p kibana -r kibana_system
# RUN elasticsearch-users useradd kibana_admin -p kibana -r kibana_admin
RUN elasticsearch-users useradd ravinder -p ravinder -r superuser
RUN elasticsearch-users useradd readonly -p readonly -r viewer

USER elasticsearch


# ENV ELASTIC_USERS=[{"username":"ravinder","password":"ravinder","roles":["superuser"]},{"username":"user1","password":"pass1","roles":["kibana_admin"]},{"username":"readonly","password":"readonly","roles":["viewer"]}]

# COPY users_roles /usr/share/elasticsearch/config/users_roles
# COPY users_passwords /usr/share/elasticsearch/config/users



EXPOSE 9200



# Note: one Kibana will connect to only one elastic search cluster ( tight coupling, need to configure at build time )
# use ealsaticserach-hq to view elstic data