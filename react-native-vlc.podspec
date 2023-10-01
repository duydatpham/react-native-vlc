Pod::Spec.new do |s|
  s.name         = "react-native-vlc"
  s.version      = "1.0.0"
  s.summary      = "VLC player"
  s.requires_arc = true
  s.author       = { 'duydatpham' => 'duydatpham@gmail.com' }
  s.license      = 'MIT'
  s.homepage     = 'https://github.com/duydatpham/react-native-vlc'
  s.source       = { :git => "https://github.com/duydatpham/react-native-vlc.git" }
  s.source_files = 'ios/RCTVLCPlayer/*'
  s.platform     = :ios, "12.4"
  s.static_framework = true  
  s.dependency 'React'
  s.dependency 'MobileVLCKit', '3.3.16.3'
end
