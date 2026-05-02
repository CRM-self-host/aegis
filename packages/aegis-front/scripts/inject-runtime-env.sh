#!/bin/sh

echo "Injecting runtime environment variables into index.html..."

CONFIG_BLOCK=$(cat << EOF
    <script id="aegis-env-config">
      window._env_ = {
        REACT_APP_SERVER_BASE_URL: "$REACT_APP_SERVER_BASE_URL"
      };
    </script>
    <!-- END: Aegis Config -->
EOF
)
# Use sed to replace the config block in index.html
# Using pattern space to match across multiple lines
echo "$CONFIG_BLOCK" | sed -i.bak '
  /<!-- BEGIN: Aegis Config -->/,/<!-- END: Aegis Config -->/{
    /<!-- BEGIN: Aegis Config -->/!{
      /<!-- END: Aegis Config -->/!d
    }
    /<!-- BEGIN: Aegis Config -->/r /dev/stdin
    /<!-- END: Aegis Config -->/d
  }
' build/index.html
rm -f build/index.html.bak
