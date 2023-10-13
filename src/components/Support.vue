<template>
  <g-link class="question__link" :to="link">
    <span class="question__icon">?</span>
    <span class="question__text">
      {{ $t('Ask your question') }}
    </span>
  </g-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
    }
  }
}
</script>

<style scoped>
  .question__link {
    position: fixed;
    display: inline-block;
    bottom: var(--space-text);
    right: var(--space-text);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-light);
    border-radius: 100px;
    border: 2px solid var(--color-light);
    background-color: var(--link-color);
    cursor: pointer;
    transition: all 1s;
    overflow: hidden;
    text-decoration: none;
  }
  .question__icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 500;
    flex-shrink: 0;
    transition: all 1s;
  }
  .question__text {
    font-size: 1rem;
    font-weight: 600;
    line-height: 0;
    width: 0;
    opacity: 0;
    visibility: hidden;
    color: #fff;
    white-space: nowrap;
    transition: all 1s;
  }
  .question__link:hover {
    border-radius: 30px;
    color: var(--color-light);
    background-color: var(--code-text-inline);
  }
  .question__link:hover .question__text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 190px;
    line-height: 1;
    opacity: 1;
    visibility: visible;
  }
</style>