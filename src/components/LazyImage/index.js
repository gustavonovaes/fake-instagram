import React from "react";
import { ImageBackground, Animated } from "react-native";

export default function LazyImage({ shouldLoad, smallSource, source, aspectRatio }) {
  const [load, setLoad] = React.useState(false);

  let opacity = new Animated.Value(0);
  function removeOpacity() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  React.useEffect(() => {
    if (shouldLoad) {
      setLoad(true);
    }
  }, [shouldLoad]);

  return <ImageBackground
    blurRadius={2}
    source={smallSource}
    resizeMode="cover"
    style={{ aspectRatio }}
  >
    {load && <Animated.Image
      style={{
        aspectRatio,
        opacity
      }}
      source={source}
      resizeMode="cover"
      onLoadEnd={removeOpacity}
    />}
  </ImageBackground>
}