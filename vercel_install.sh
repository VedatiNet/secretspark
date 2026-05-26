#!/usr/bin/env bash
set -e
if [ ! -d "flutter" ]; then
  git clone https://github.com/flutter/flutter.git -b stable --depth 1 flutter
fi
./flutter/bin/flutter config --enable-web
./flutter/bin/flutter pub get
