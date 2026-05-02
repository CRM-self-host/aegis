resource "kubernetes_namespace" "u84u" {
  metadata {
    annotations = {
      name = var.u84u_namespace
    }

    name = var.u84u_namespace
  }
}
