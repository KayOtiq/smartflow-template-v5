import { BasePage } from "./basePage";
import { Locator, Page } from "@playwright/test";

export class HandToolsPage extends BasePage {
    get handToolsHeader(): Locator {
        return this.page.getByRole('heading', { name: 'Hand Tools' });
    }
    get combinationPliersLink(): Locator {
        return this.page.getByRole('link', { name: "Combination Pliers $14.15" });
    }
    get boldCuttersLink(): Locator {
        return this.page.getByRole('link', { name: "Bolt Cutters $48.41" });
    }
    get pliersLink(): Locator {
        return this.page.getByRole('link', { name: "Pliers $12.01" });
    }
    // Add more locators as getters as needed
}

