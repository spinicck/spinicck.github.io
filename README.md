This is a test to make my own website using very simple to no framework for HTML, CSS and javascript.
The website should change over time along with this README file that is in the first stage.

# How to make a new card ?

The card in each cell of the grid container must follow some some format to avoid any bugs, although it is relatively free.
Even if it is not minimal the best is to copy the snipet code below to the HTML within the grid container.

For **regular** card:
```html
    <div class="card-item card-shadow card-collapse">
        <div class="card-header">
            <h3 class="card-header-title">
                Card title
            </h3>
        </div>
        <div>
            <span class="card-desc">
                Put the description of the card here.
            </span>
        </div>
    </div>
```

For **expandable** card:
```html
        <div class="card-item card-shadow card-hover card-collapse" onclick="toggleExpandCard(this)" style="grid-column: 3 / span 1; grid-row: 1 / span 1;">
        <div class="card-header">
            <h3 class="card-header-title">
                Card title
            </h3>
            <p class="card-header-info">Click to expand</p>
        </div>
        <div>
            <span class="card-desc">
                Put the description of the card here.
            </span>
        </div>
    </div>
```

> [!NOTE]
> An element with the class name `card-header-info` must be present in the header of expandable cards.