# Fella roadmap

## Milestone 1: Floofi Crature Interface Guidelines
- [ ] Instruction cards (Do Not [red], Caution [orange], Do [blue])
- [ ] [Pagination](https://vercel.com/geist/pagination)
- [ ] [Code block](https://vercel.com/geist/code-block) (with multiple languages)
- [ ] [Snippet](https://vercel.com/geist/snippet)
- [ ] [Tabs](https://vercel.com/geist/tabs)
- [ ] [Note](https://vercel.com/geist/note)
- [ ] [Keyboard input](https://vercel.com/geist/keyboard-input)
- [ ] [Table](https://vercel.com/geist/table)

## Milestone 2: Web applications
- [ ] [Error](https://vercel.com/geist/error)
- [ ] [Badge](https://vercel.com/geist/badge)
- [ ] [Checkbox](https://vercel.com/geist/checkbox)
- [ ] [Radio](https://vercel.com/geist/radio)
- [ ] [Toggle](https://vercel.com/geist/toggle)
- [ ] [Slider](https://vercel.com/geist/slider)
- [ ] [Progress](https://vercel.com/geist/progress)
- [ ] [Gauge](https://vercel.com/geist/gauge)
- [ ] [Menu](https://vercel.com/geist/menu)
- [ ] [Spinner](https://vercel.com/geist/spinner)
- [ ] [Loading dots](https://vercel.com/geist/loading-dots)
- [ ] [Modal](https://vercel.com/geist/modal) (bare implementation already present)
- [ ] [Info banner](https://vercel.com/geist/project-banner)
- [ ] [Status dot](https://vercel.com/geist/status-dot)

## Milestone 3: Extended applications
- [ ] [Avatar](https://vercel.com/geist/avatar)
- [ ] [Empty state](https://vercel.com/geist/empty-state)
- [ ] [Choicebox](https://vercel.com/geist/choicebox)
- [ ] [Show more](https://vercel.com/geist/show-more)
- [ ] [Skeleton](https://vercel.com/geist/skeleton)
- [ ] [Split button](https://vercel.com/geist/split-button)
- [ ] [Switch](https://vercel.com/geist/switch)
- [ ] [Context menu](https://vercel.com/geist/context-menu)

## Milestone 4: Development framework
- [ ] Fellup UI design toolkit (kinda like Material Compose)
  - YAML
    - ```yaml
      Navigation:
          - id: "navbar"
          - NavigationLeft:
              - NavigationIcon:
                  label: "Test Thing"
                  target: "/"
                  image: "/assets/logo.png"
          - NavigationRight:
              - NavigationSubtitle:
                  - text: "Hello world"
      ```
  - XML (similar to React)
    - ```xml
      <Navigation id="navbar">
          <NavigationLeft>
              <NavigationIcon label="Test Thing" target="/" image="/assets/logo.png" />
          </NavigationLeft>
          <NavigationRight>
              <NavigationSubtitle>Hello world</NavigationSubtitle>
          </NavigationRight>
      </Navigation>
      ```
  - Expected HTML output
      - ```html
        <nav id="navbar" class="fella-nav">
            <div class="fella-nav-inner">
                <div class="fella-nav-left">
                    <a href="/" target="_blank">
                        <img class="fella-nav-icon" alt="Test Thing" src="/assets/logo.png">
                    </a>
                </div>
                <div class="fella-nav-right">
                    <span class="fella-nav-subtitle">Hello world</span>
                </div>
            </div>
        </nav>
        ```
- [ ] [Stack](https://vercel.com/geist/stack)