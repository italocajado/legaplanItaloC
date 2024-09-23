import {Inter_Tight} from '@next/font/google';
import '../styles/globals.scss';

const interTight = Inter_Tight({
    subsets: ['latin'],
    variable: '--font-inter',
    weight: ['400', '500', '600', '700']
});

function MyApp({Component, pageProps}){
    return<Component {...pageProps}/>
}
export default  MyApp;
