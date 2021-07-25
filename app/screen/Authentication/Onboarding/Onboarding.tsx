import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { SLIDE_HEIGHT, width } from '../../../config/Constants';
import { useStore } from '../../../store/rootStore';

import Paginator from './Paginator';
import Slide from './Slide';
import SlideFooter from './SlideFooter';

type slideType = {
  description: string;
  image: number;
  title: string;
};

const slides: slideType[] = [
  {
    description: 'Always stay organized, plan ahead.',
    image: require('./images/1.png'),
    title: 'Stay Organized',
  },
  {
    description:
      'Add more details than ever to each tasks, customized them with their own unique colors to your taste.',
    image: require('./images/2.png'),
    title: 'Keep Everything in Details',
  },
  {
    description:
      "Think of each tasks as 'opportunities'; take joy in completing them.",
    image: require('./images/3.png'),
    title: 'Complete Your Goals',
  },
];

export const assets = slides.map(slide => slide.image);

const Onboarding = observer(function (): JSX.Element | null {
  const { authStore } = useStore();
  //*NOTE: There's an issue with the reanimated useRef properties for Animated.ScrollView. Reason I'm passing as any ih thr next line
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aref = useAnimatedRef<Animated.ScrollView>() as any;
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const reanimatedFooterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Animated.ScrollView
          ref={aref}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={scrollHandler}
          scrollEventThrottle={1}>
          {slides.map((slide, index) => (
            <Slide key={index} image={slide.image} index={index} />
          ))}
        </Animated.ScrollView>
      </View>
      <View style={styles.footer}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
          ]}
        />
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <Paginator key={index} {...{ index, translateX }} />
          ))}
        </View>
        <Animated.View
          style={[
            { flex: 1, flexDirection: 'row', width: width * slides.length },
            reanimatedFooterStyle,
          ]}>
          {slides.map(({ title, description }, index) => {
            const last = index === slides.length - 1;
            return (
              <SlideFooter
                key={index}
                onPress={() => {
                  if (last) {
                    authStore.setOnboardingCompleted();
                    console.log(authStore.onboarding);
                  } else {
                    aref.current?.scrollTo({
                      animated: true,
                      x: width * (index + 1),
                    });
                  }
                }}
                {...{ description, last, title }}
              />
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
  },
  slider: {
    height: SLIDE_HEIGHT,
  },
});

export default Onboarding;
