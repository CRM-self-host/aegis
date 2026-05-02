######################
# Required Variables #
######################
variable "u84u_pgdb_admin_password" {
  type        = string
  description = "u84u password for postgres database."
  sensitive   = true
}

variable "u84u_app_hostname" {
  type        = string
  description = "The protocol, DNS fully qualified hostname, and port used to access u84u in your environment. Ex: https://crm.example.com:443"
}

######################
# Optional Variables #
######################
variable "u84u_app_name" {
  type        = string
  default     = "u84u"
  description = "A friendly name prefix to use for every component deployed."
}

variable "u84u_server_image" {
  type        = string
  default     = "u84u/aegis:latest"
  description = "u84u server image for the server deployment. This defaults to latest. This value is also used for the workers image."
}

variable "u84u_db_image" {
  type        = string
  default     = "u84u/aegis-postgres-spilo:latest"
  description = "u84u image for database deployment. This defaults to latest."
}

variable "u84u_server_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the u84u server deployment. This defaults to 1."
}

variable "u84u_worker_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the u84u worker deployment. This defaults to 1."
}

variable "u84u_db_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the u84u database deployment. This defaults to 1."
}

variable "u84u_server_data_mount_path" {
  type        = string
  default     = "/app/packages/aegis-server/.local-storage"
  description = "u84u mount path for servers application data. Defaults to '/app/packages/aegis-server/.local-storage'."
}

variable "u84u_db_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "u84u_server_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "u84u_db_pv_capacity" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity provisioned for database persistent volume."
}

variable "u84u_db_pvc_requests" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity reservation for database persistent volume claim."
}

variable "u84u_server_pv_capacity" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity provisioned for server persistent volume."
}

variable "u84u_server_pvc_requests" {
  type        = string
  default     = "10Gi"
  description = "Storage capacity reservation for server persistent volume claim."
}

variable "u84u_namespace" {
  type        = string
  default     = "u84u"
  description = "Namespace for all u84u resources"
}

variable "u84u_redis_replicas" {
  type        = number
  default     = 1
  description = "Number of replicas for the u84u Redis deployment. This defaults to 1."
}

variable "u84u_redis_image" {
  type        = string
  default     = "redis/redis-stack-server:latest"
  description = "u84u image for Redis deployment. This defaults to latest."
}

variable "u84u_docker_data_mount_path" {
  type        = string
  default     = "/app/docker-data"
  description = "u84u mount path for servers application data. Defaults to '/app/docker-data'."
}

variable "u84u_docker_data_pv_path" {
  type        = string
  default     = ""
  description = "Local path to use to store the physical volume if using local storage on nodes."
}

variable "u84u_docker_data_pv_capacity" {
  type        = string
  default     = "100Mi"
  description = "Storage capacity provisioned for server persistent volume."
}

variable "u84u_docker_data_pvc_requests" {
  type        = string
  default     = "100Mi"
  description = "Storage capacity reservation for server persistent volume claim."
}
