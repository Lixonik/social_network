/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/users.js":
/*!******************************!*\
  !*** ./src/scripts/users.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n$(document).ready(function () {\n  $(\".btn-friends\").click(function () {\n    window.location.href = \"/users/\".concat($(this).attr('data-id'), \"/friends\");\n  });\n  $(\".btn-news\").click(function () {\n    window.location.href = \"/users/\".concat($(this).attr('data-id'), \"/news\");\n  });\n  $(\".btn-edit\").click(function () {\n    var user = {\n      id: $(this).attr('data-id'),\n      surname: $(this).parent().parent().parent().find('.surname input.form-control').val(),\n      name: $(this).parent().parent().parent().find('.name input.form-control').val(),\n      patronymic: $(this).parent().parent().parent().find('.patronymic input.form-control').val(),\n      birthday: $(this).parent().parent().parent().find('.birthday input.form-control').val(),\n      email: $(this).parent().parent().parent().find('.email input.form-control').val(),\n      role: $(this).parent().parent().parent().find('select.form-control.role').val(),\n      status: $(this).parent().parent().parent().find('select.form-control.status').val()\n    };\n    $.ajax({\n      url: \"/users\",\n      method: 'PUT',\n      contentType: 'application/json;charset=utf-8',\n      data: JSON.stringify(user)\n    });\n  });\n});\n\n//# sourceURL=webpack://admin_module/./src/scripts/users.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/users.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;