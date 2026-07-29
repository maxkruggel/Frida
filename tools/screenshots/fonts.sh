#!/usr/bin/env bash
# Handschrift-Ersatz für Screenshot-Läufe auf Systemen ohne „Noteworthy" (Linux/CI).
# Installiert Patrick Hand und mappt Noteworthy/Bradley Hand/cursive darauf,
# damit die Screenshots der iPhone-Anmutung nahekommen.
set -euo pipefail
mkdir -p ~/.fonts ~/.config/fontconfig
curl -sL "https://fonts.gstatic.com/s/patrickhand/v25/LDI1apSQOAYtSuYWp8ZhfYeMWQ.ttf" \
  -o ~/.fonts/PatrickHand-Regular.ttf
cat > ~/.config/fontconfig/fonts.conf <<'XML'
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <match target="pattern"><test name="family"><string>Noteworthy</string></test>
    <edit name="family" mode="assign" binding="strong"><string>Patrick Hand</string></edit></match>
  <match target="pattern"><test name="family"><string>Bradley Hand</string></test>
    <edit name="family" mode="assign" binding="strong"><string>Patrick Hand</string></edit></match>
  <match target="pattern"><test name="family"><string>cursive</string></test>
    <edit name="family" mode="assign" binding="strong"><string>Patrick Hand</string></edit></match>
</fontconfig>
XML
fc-cache -f >/dev/null
fc-match "Noteworthy"
