'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">angular-front-end-d3 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-31ba635572199ceeecd943d08f925fd9"' : 'data-target="#xs-components-links-module-AppModule-31ba635572199ceeecd943d08f925fd9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-31ba635572199ceeecd943d08f925fd9"' :
                                            'id="xs-components-links-module-AppModule-31ba635572199ceeecd943d08f925fd9"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InschrijvenDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InschrijvenDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoperComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoperComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainNavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterRouteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterRouteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterRouteItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterRouteItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrackConfirmComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrackConfirmComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RouteModule.html" data-type="entity-link">RouteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RouteModule-be1364b1404789d78e3897b9d2b990e6"' : 'data-target="#xs-components-links-module-RouteModule-be1364b1404789d78e3897b9d2b990e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RouteModule-be1364b1404789d78e3897b9d2b990e6"' :
                                            'id="xs-components-links-module-RouteModule-be1364b1404789d78e3897b9d2b990e6"' }>
                                            <li class="link">
                                                <a href="components/DeleteDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeoJsonUploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeoJsonUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RouteEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RouteEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoutesOverviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RoutesOverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrackComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrackComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserModule-adf5763b14f2cc5d2dd565ec0da35d72"' : 'data-target="#xs-components-links-module-UserModule-adf5763b14f2cc5d2dd565ec0da35d72"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-adf5763b14f2cc5d2dd565ec0da35d72"' :
                                            'id="xs-components-links-module-UserModule-adf5763b14f2cc5d2dd565ec0da35d72"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ConfirmRegisterComponent.html" data-type="entity-link">ConfirmRegisterComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/FeatureCollection.html" data-type="entity-link">FeatureCollection</a>
                            </li>
                            <li class="link">
                                <a href="classes/GeoJson.html" data-type="entity-link">GeoJson</a>
                            </li>
                            <li class="link">
                                <a href="classes/HuidigeLocatieResponse.html" data-type="entity-link">HuidigeLocatieResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Inschrijving.html" data-type="entity-link">Inschrijving</a>
                            </li>
                            <li class="link">
                                <a href="classes/Loper.html" data-type="entity-link">Loper</a>
                            </li>
                            <li class="link">
                                <a href="classes/Point.html" data-type="entity-link">Point</a>
                            </li>
                            <li class="link">
                                <a href="classes/Route.html" data-type="entity-link">Route</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouteLoper.html" data-type="entity-link">RouteLoper</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInfo.html" data-type="entity-link">UserInfo</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoperDataService.html" data-type="entity-link">LoperDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MapDataService.html" data-type="entity-link">MapDataService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthenticationInterceptor.html" data-type="entity-link">AuthenticationInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IFeatureCollection.html" data-type="entity-link">IFeatureCollection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGeoJson.html" data-type="entity-link">IGeoJson</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGeometry.html" data-type="entity-link">IGeometry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InschrijvingJson.html" data-type="entity-link">InschrijvingJson</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPoint.html" data-type="entity-link">IPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoperJson.html" data-type="entity-link">LoperJson</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfoJson.html" data-type="entity-link">UserInfoJson</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});