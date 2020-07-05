import { Component, h, Prop, State, getAssetPath } from '@stencil/core';
import { MenuItem } from '../../kompendium/config';

/**
 * @private
 */
@Component({
    tag: 'kompendium-navigation',
    styleUrl: 'navigation.scss',
    shadow: true
})
export class Navigation {

    @Prop()
    public menu: MenuItem[];

    @Prop()
    public header: string;

    @State()
    private route: string = '';

    constructor() {
        this.setRoute = this.setRoute.bind(this);
        this.renderMenuItem = this.renderMenuItem.bind(this)
    }

    protected componentWillLoad() {
        window.addEventListener('hashchange', this.setRoute);
        this.setRoute();
    }

    protected componentDidUnload() {
        window.removeEventListener('hashchange', this.setRoute);
    }

    private setRoute() {
        this.route = location.hash.substr(1);
    }

    public render() {
        return [
            <nav class="nav-panel">
                <header class="panel-header">
                    <h1><a href="#">{this.header}</a></h1>
                    <kompendium-search/>
                </header>
                {this.renderChapters(this.menu)}
            </nav>
        ];
    }

    private renderChapters(menu: MenuItem[]) {
        if (!menu || !menu.length) {
            return;
        }

        return (
            <ul class="panel-list">
                {menu.map(this.renderMenuItem)}
            </ul>
        );
    }

    private renderMenuItem(item: MenuItem) {
        const classList = {
            active: this.isRouteActive(item.path),
            chapters: true,
            'panel-list': true
        };
        const anchorClassList = {
            'panel-link': true,
            active: this.isRouteActive(item.path),
        };
        const chapters = item.children || [];
        const path = getAssetPath('../collection/assets/icons/arrow-right-s-line.svg');

        return (
            <li class="panel-item">
                <a class={anchorClassList} href={'#' + item.path}>
                    <span class="link-text">
                        <img src={path} />
                        {item.title}
                    </span>
                </a>
                <ul class={classList}>
                    {chapters.map(this.renderMenuItem)}
                </ul>
            </li>
        );
    }

    private isRouteActive(route: string) {
        return this.route.startsWith(route);
    }
}

// function hasContent(item: MenuItem) {
//     return item.children?.length > 0;
// }
