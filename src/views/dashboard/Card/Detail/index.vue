<template>
  <div>
    <!-- 头部 -->
    <div class="card-header">
      <span>{{ title }}</span>
      <svg
        t="1646470497825"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2216"
        width="15"
        height="15"
      >
        <path
          d="M480 437.344h64v309.312h-64v-245.312h-64v-64h64zM512 288a53.344 53.344 0 1 1 0 106.656A53.344 53.344 0 0 1 512 288z m0-224c246.4 0 448 201.6 448 448s-201.6 448-448 448S64 758.4 64 512 265.6 64 512 64z m0 69.824C304.16 133.824 133.824 304.16 133.824 512c0 207.84 170.336 378.176 378.176 378.176 207.84 0 378.176-170.336 378.176-378.176 0-207.84-170.336-378.176-378.176-378.176z"
          p-id="2217"
        ></path>
      </svg>
    </div>
    <!-- 内容 -->
    <div class="card-content">{{count}}</div>
    <!-- 图表 -->
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <!-- 底部 -->
    <div class="card-footer">
      <slot name="footer">ri</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title','count']
}
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  color: #bbb;
}
.card-content {
  font-size: 25px;
  padding: 5px 0;
}
.card-charts {
  height: 50px;
}
.card-footer {
  border-top: 1px solid #eeeeee;
  padding-top: 10px;
}
</style>