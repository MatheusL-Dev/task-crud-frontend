import LottieWeb from "@/shared-components/LottieWeb";
import ReactLottieJsonRed from "@/public/lottie/react-red.json";

const logoReactOptions = {
    loop: true,
    autoplay: true,
    animationData: ReactLottieJsonRed,
    height: 160,
    width: 160,
};

export default function LogoReact() {
    return <LottieWeb animation={logoReactOptions} />;
}
