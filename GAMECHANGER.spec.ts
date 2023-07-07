// Slow down funcion for debugging with headed mode

function slowLocator(page: Page, waitInMs: number): (...args: any[]) => Locator {
    // Grab original
    const l = page.locator.bind(page);

    // Return a new function that uses the original locator but remaps certain functions
    return (locatorArgs) => {
        const locator = l(locatorArgs);

        locator.click = async (args) => {
            await new Promise((r) => setTimeout(r, waitInMs));
            return l(locatorArgs).click(args);
        };

        locator.fill = async (args) => {
            await new Promise((r) => setTimeout(r, waitInMs));
            return l(locatorArgs).fill(args);
        };

        return locator;
    };
}
page.locator = slowLocator(page, 500);
