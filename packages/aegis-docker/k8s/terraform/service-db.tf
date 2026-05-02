resource "kubernetes_service" "u84u_db" {
  metadata {
    name      = "${var.u84u_app_name}-db"
    namespace = kubernetes_namespace.u84u.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.u84u_app_name}-db"
    }
    session_affinity = "ClientIP"
    port {
      port        = 5432
      target_port = 5432
    }

    type = "ClusterIP"
  }
}
