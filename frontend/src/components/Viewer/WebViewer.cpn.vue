<template>
      <div id='webviewer-render'>
      <div class="exitWebViewer">
        <div>
          <button class="btn btn-secondary" 
                  @click.prevent='$router.go(-1)'>
            <i class="bi bi-arrow-left"></i>
          </button>
        </div>
        <div>
          {{initialDoc}}
        </div>
        <div>
          
          <button class="btn btn-secondary" >
            <a :href="initialDoc"><i class="bi bi-download"></i></a>
          </button>
        </div>
      </div>
      <div id="webviewer" ref="viewer"></div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import WebViewer from "@pdftron/webviewer";

export default {
  name: "WebViewer",
  props: { initialDoc: { type: String } },
  data(){
    return {
      // isWebViewer: true,
    }
  },
  setup(props) {
    const viewer = ref(null);
      onMounted(() => {
        const path = '/webviewer';
        WebViewer({ path, initialDoc: props.initialDoc }, viewer.value)
      });
      return {
        viewer,
      };
  },
};
</script>

<style>
#webviewer-render {
  width: 100%;
  height: 430px;
  position: fixed;
  left: 0px;
  top: 0px;
}
.exitWebViewer{
  display: grid;
  grid-template-columns: auto 85% auto;
  background-color: #060000d6;
  align-items: center;
  padding: 3px 10px;
  color: white;
}
#webviewer{
  height: 100%;
}
</style>






     <!--      .then(
            (instance) => {
              const { documentViewer, annotationManager, Annotations } =
                instance.Core;

              documentViewer.addEventListener("documentLoaded", () => {
                const rectangleAnnot = new Annotations.RectangleAnnotation({
                  PageNumber: 1,
                  X: 100,
                  Y: 150,
                  Width: 743,
                  Height: 500,
                  Author: annotationManager.getCurrentUser(),
                });
                annotationManager.addAnnotation(rectangleAnnot);
                annotationManager.redrawAnnotation(rectangleAnnot);
              });
            }
          ); -->