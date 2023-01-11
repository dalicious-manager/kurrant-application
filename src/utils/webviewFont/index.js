export const generateAssetsFontCss = (
    fontFamily,
    fileFormat = "ttf"
) => {
    const fileName = Platform.select({
        ios: `file:///assets/fonts/${fontFamily}.${fileFormat}`,
        android: `file:///android_asset/fonts/${fontFamily}.${fileFormat}`
    });

    return `@font-face {
		font-family: '${fontFamily}';
		src: url("${fileName}")
}`;
};