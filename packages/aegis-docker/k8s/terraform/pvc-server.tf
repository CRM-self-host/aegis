resource "kubernetes_persistent_volume_claim" "server" {
  metadata {
    name      = "${var.u84u_app_name}-server-pvc"
    namespace = kubernetes_namespace.u84u.metadata.0.name
  }
  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = var.u84u_server_pvc_requests
      }
    }
    volume_name = kubernetes_persistent_volume.server.metadata.0.name
  }
}
