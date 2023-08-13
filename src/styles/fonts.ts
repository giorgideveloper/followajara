import localFont from 'next/font/local';

const firaGo = localFont({
	src: './FiraGO-Regular.ttf',
	display: 'swap',
	variable: '--font-fira-go',
});

const Adaptirebuli = localFont({
	src: './Adaptirebuli_1.otf',
	display: 'swap',
	variable: '--font-adaptirebuli',
});

const GeoGza = localFont({
	src: './geo-gza.woff',
	display: 'swap',
	variable: '--font-geo-gza',
});

const Banner_caps = localFont({
	src: './bpg_banner_caps.ttf',
	display: 'swap',
	variable: '--BPG-ExtraSquare-Mtavruli',
});
export { firaGo, Adaptirebuli, GeoGza, Banner_caps };
