resource "kubernetes_service" "u84u_server" {
  metadata {
    name      = "${var.u84u_app_name}-server"
    namespace = kubernetes_namespace.u84u.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.u84u_app_name}-server"
    }
    session_affinity = "ClientIP"
    port {
      name        = "http-tcp"
      port        = 3000
      target_port = 3000
    }

    type = "ClusterIP"
  }
}
