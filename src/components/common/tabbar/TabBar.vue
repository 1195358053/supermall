<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TabBar',
    
}
</script>

<style>
    #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    height: 49px;
    border-top: 1px solid #eee;
    box-shadow: 0 -1px 1px rgba(150, 150, 150, .08);

    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    
  }
</style>