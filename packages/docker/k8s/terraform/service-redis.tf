resource "kubernetes_service" "u84u_redis" {
  metadata {
    name      = "${var.u84u_app_name}-redis"
    namespace = kubernetes_namespace.u84u.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.u84u_app_name}-redis"
    }
    session_affinity = "ClientIP"
    port {
      port        = 6379
      target_port = 6379
    }

    type = "ClusterIP"
  }
}
