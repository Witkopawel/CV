import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n.config';

function getLocale(request: NextRequest): string {

    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && i18n.locales.includes(cookieLocale as any)){
	return cookieLocale;
    }


    const acceptLanguage = request.headers.get('accept-language');
    
    if (!acceptLanguage) return i18n.defaultLocale;
    for (const locale of i18n.locales){
	if (acceptLanguage.toLowerCase().includes(locale)){
	    return locale;
	}
     }
     return i18n.defaultLocale;
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/media') ||
        pathname.startsWith('/static') ||
        pathname.match(/\.(.*)$/)
    ) {
        return NextResponse.next();
    }
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }
}
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
