## useTooltip

> useTooltip is a React hook to easily create tooltip in your React components.

## Install

@seracio/tooltip has 2 peer dependencies that need to be installed first

```bash
npm i React d3-selection
npm i @seracio/tooltip
```

## Usage

You need to be aware of several things:

-   The hook returns 2 things: the component Tooltip itself and a ref to the container
-   The container that will get the ref needs to be in relative position or it won't work
-   The hook will make tooltips on each element with a `data-tooltip` attribute
-   In this attribute, you can specify html or simple text (no jsx though)

```js
const MyComponent = () => {
    const [Tooltip, root] = useTooltip();

    const size = 500;
    const data = [
        {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: 'red'
        },
        {
            x: 300,
            y: 200,
            width: 50,
            height: 80,
            fill: 'red'
        }
    ];

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                margin: 'auto'
            }}
            ref={root}
        >
            <Tooltip />
            <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox={`0 0 ${size} ${size}`}
            >
                {data.map((d, i) => {
                    return (
                        <rect
                            style={{ cursor: 'pointer' }}
                            key={i}
                            data-tooltip={`rect number ${i + 1}`}
                            {...d}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

render(<MyComponent />, document.querySelector('#root'));
```

## API

// TODO
