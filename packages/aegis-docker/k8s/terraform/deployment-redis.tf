resource "kubernetes_deployment" "u84u_redis" {
  metadata {
    name      = "${var.u84u_app_name}-redis"
    namespace = kubernetes_namespace.u84u.metadata.0.name

    labels = {
      app = "${var.u84u_app_name}-redis"
    }
  }

  spec {
    replicas = var.u84u_redis_replicas
    selector {
      match_labels = {
        app = "${var.u84u_app_name}-redis"
      }
    }

    strategy {
      type = "RollingUpdate"
      rolling_update {
        max_surge       = "1"
        max_unavailable = "1"
      }
    }

    template {
      metadata {
        labels = {
          app = "${var.u84u_app_name}-redis"
        }
      }

      spec {
        container {
          image = var.u84u_redis_image
          name  = "redis"

          port {
            container_port = 6379
            protocol       = "TCP"
          }

          resources {
            requests = {
              cpu    = "250m"
              memory = "1024Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "2048Mi"
            }
          }
        }
        dns_policy     = "ClusterFirst"
        restart_policy = "Always"
      }
    }
  }
}
