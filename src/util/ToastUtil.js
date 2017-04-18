/**
 * 冒一个时间比较短的Toast
 * @param content
 */
import Toast from 'react-native-root-toast';

export const toastShort = (content,onHidden) => {
    content = content ||'未知异常';
    Toast.show(content.toString(), {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        onHidden:onHidden || (()=>{}),
        delay: 0
    });
};