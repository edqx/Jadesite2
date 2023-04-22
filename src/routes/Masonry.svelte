<script lang="ts">
    export let defaultColumns: number;
    export let minColumnSize: number;
    export let gap: number;

    let masonryElement: HTMLDivElement|undefined = undefined;
    let childrenElement: HTMLDivElement|undefined = undefined;

    $: resizeChildren = childrenElement ? [...childrenElement.children] : undefined;
    $: initialChildren = resizeChildren ? [...resizeChildren] : undefined;

    $: masonryElement && initialChildren && resize();

    function getBestColumns(containerWidth: number) {
        let n = defaultColumns;
        while (containerWidth / n < minColumnSize)
            n--;

        return n;
    }

    function resize() {
        if (masonryElement === undefined || initialChildren === undefined || childrenElement === undefined)
            return undefined;

        const bounds = masonryElement.getBoundingClientRect();
        const numColumns = getBestColumns(bounds.width);

        const columnWidth = bounds.width / numColumns;
        while (masonryElement.lastElementChild) {
            masonryElement.removeChild(masonryElement.lastElementChild);
        }
        const columns = [];
        for (let i = 0; i < numColumns; i++) {
            const column = document.createElement("div");
            column.style.display = "flex";
            column.style.flexDirection = "column";
            column.style.width = columnWidth + "px";
            column.style.gap = gap + "px";
            column.style.height = "max-content";
            columns.push(column);
            masonryElement.appendChild(column);
        }
        for (let i = 0, j = 0; i < initialChildren.length; i++, j++, j = j % numColumns) {
            columns[j].appendChild(initialChildren[i].cloneNode(true));
        }
        for (let i = 0; i < columns.length; i++) {
            let flag = true;
            while (flag) {
                flag = false;
                const columnA = columns[i];
                const columnHeightA = columnA.getBoundingClientRect().height;
                let smallestElement: HTMLElement|undefined = undefined;
                let smallestElementHeight = Infinity;
                for (const child of columnA.children) {
                    const bounds = child.getBoundingClientRect();
                    if (bounds.height < smallestElementHeight) {
                        smallestElement = child as HTMLElement;
                        smallestElementHeight = bounds.height;
                    }
                }
                if (smallestElement === undefined)
                    continue;

                for (let j = 0; j < columns.length; j++) {
                    const columnB = columns[j];
                    if (i === j)
                        continue;

                    const columnHeightB = columnB.getBoundingClientRect().height;
                    if (Math.abs(columnHeightA - columnHeightB - 2 * smallestElementHeight) < Math.abs(columnHeightA - columnHeightB)) {
                        try {
                            columnA.removeChild(smallestElement);
                            columnB.appendChild(smallestElement);
                            flag = true;
                        } catch (e) {
                            
                        }
                    }
                }
            }
        }
    }
</script>

<svelte:window on:resize={resize}></svelte:window>

<div style="display: none;" bind:this={childrenElement}>
    <slot/>
</div>
<div style="display: flex; width: 100vw; gap: {gap}px;" bind:this={masonryElement}></div>