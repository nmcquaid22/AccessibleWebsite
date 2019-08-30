/*! nostyle 2019-05-06 */
function Stepper(t, e) {
    this.input = $(t), this.container = this.input.parent(), this.setOptions(e), this.wrapper = $('<div class="stepper"></div>'), this.wrapper.append(this.input), this.container.append(this.wrapper), this.createRemoveButton(), this.createAddButton(), this.createStatusBox(), this.wrapper.on("click", ".stepper-removeButton", $.proxy(this, "onRemoveClick")), this.wrapper.on("click", ".stepper-addButton", $.proxy(this, "onAddClick"))
}
Stepper.prototype.createStatusBox = function() {
    this.statusBox = $('<div role="status" aria-live="polite" class="visually-hidden" />'), this.wrapper.append(this.statusBox)
}, Stepper.prototype.setOptions = function(t) {
    this.options = $.extend({
        removeLabel: "Remove",
        addLabel: "Add"
    }, t)
}, Stepper.prototype.createRemoveButton = function() {
    this.removeButton = $('<button class="stepper-removeButton" type="button" aria-label="' + this.options.removeLabel + '">&minus;</button>'), this.options.labelId && this.removeButton.attr("aria-describedby", this.options.labelId), this.wrapper.prepend(this.removeButton)
}, Stepper.prototype.createAddButton = function() {
    this.addButton = $('<button class="stepper-addButton" type="button" aria-label="' + this.options.addLabel + '">&#43;</button>'), this.options.labelId && this.addButton.attr("aria-describedby", this.options.labelId), this.wrapper.append(this.addButton)
}, Stepper.prototype.getInputValue = function() {
    var t = parseInt(this.input.val(), 10);
    return isNaN(t) && (t = 0), t
}, Stepper.prototype.onRemoveClick = function(t) {
    var e = this.getInputValue() - 1;
    e >= parseInt(this.input.attr("min"), 10) && (this.input.val(e), this.updateStatusBox(e))
}, Stepper.prototype.onAddClick = function(t) {
    var e = this.getInputValue() + 1;
    e <= parseInt(this.input.attr("max"), 10) && (this.input.val(e), this.updateStatusBox(e))
}, Stepper.prototype.updateStatusBox = function(t) {
    this.statusBox.html(t)
};

function SelectAll(t, e) {
    this.button = $('<button type="button" class="selectAll-button">Select all</button>'), this.button.on("click", $.proxy(this, "onButtonClick")), t.append(this.button), this.checkboxes = e, this.checked = !1
}
SelectAll.prototype.onButtonClick = function(t) {
    this.checked ? (this.uncheckAll(), this.button.text("Select all")) : (this.checkAll(), this.button.text("Deselect all"))
}, SelectAll.prototype.checkAll = function() {
    this.checkboxes.each($.proxy(function(t, e) {
        e.checked = !0
    }, this)), this.checked = !0
}, SelectAll.prototype.uncheckAll = function() {
    this.checkboxes.each($.proxy(function(t, e) {
        e.checked = !1
    }, this)), this.checked = !1
};

function Autocomplete(t) {
    this.select = t, this.container = t.parent(), this.wrapper = $('<div class="autocomplete"></div>'), this.container.append(this.wrapper), this.createTextBox(), this.createArrowIcon(), this.createMenu(), this.hideSelectBox(), this.createStatusBox(), this.setupKeys(), $(document).on("click", $.proxy(this, "onDocumentClick"))
}
Autocomplete.prototype.onDocumentClick = function(t) {
    $.contains(this.container[0], t.target) || (this.hideMenu(), this.removeTextBoxFocus())
}, Autocomplete.prototype.setupKeys = function() {
    this.keys = {
        enter: 13,
        esc: 27,
        space: 32,
        up: 38,
        down: 40,
        tab: 9,
        left: 37,
        right: 39,
        shift: 16
    }
}, Autocomplete.prototype.onTextBoxFocus = function() {
    this.textBox.addClass("autocomplete-isFocused")
}, Autocomplete.prototype.removeTextBoxFocus = function() {
    this.textBox.removeClass("autocomplete-isFocused")
}, Autocomplete.prototype.onTextBoxClick = function(t) {
    this.clearOptions();
    var e = this.getAllOptions();
    this.buildMenu(e), this.updateStatus(e.length), this.showMenu(), "function" == typeof t.currentTarget.select && t.currentTarget.select()
}, Autocomplete.prototype.onTextBoxKeyUp = function(t) {
    switch (t.keyCode) {
        case this.keys.esc:
        case this.keys.up:
        case this.keys.left:
        case this.keys.right:
        case this.keys.space:
        case this.keys.enter:
        case this.keys.tab:
        case this.keys.shift:
            break;
        case this.keys.down:
            this.onTextBoxDownPressed(t);
            break;
        default:
            this.onTextBoxType(t)
    }
}, Autocomplete.prototype.onMenuKeyDown = function(t) {
    switch (t.keyCode) {
        case this.keys.up:
            this.onOptionUpArrow(t);
            break;
        case this.keys.down:
            this.onOptionDownArrow(t);
            break;
        case this.keys.enter:
            this.onOptionEnter(t);
            break;
        case this.keys.space:
            this.onOptionSpace(t);
            break;
        case this.keys.esc:
            this.onOptionEscape(t);
            break;
        case this.keys.tab:
            this.hideMenu(), this.removeTextBoxFocus();
            break;
        default:
            this.textBox.focus()
    }
}, Autocomplete.prototype.onTextBoxType = function(t) {
    if (this.textBox.val().trim().length > 0) {
        var e = this.getOptions(this.textBox.val().trim().toLowerCase());
        this.buildMenu(e), this.showMenu(), this.updateStatus(e.length)
    } else this.hideMenu();
    this.updateSelectBox()
}, Autocomplete.prototype.updateSelectBox = function() {
    var t = this.textBox.val().trim(),
        e = this.getMatchingOption(t);
    e ? this.select.val(e.value) : this.select.val("")
}, Autocomplete.prototype.onOptionEscape = function(t) {
    this.clearOptions(), this.hideMenu(), this.focusTextBox()
}, Autocomplete.prototype.focusTextBox = function() {
    this.textBox.focus()
}, Autocomplete.prototype.onOptionEnter = function(t) {
    this.isOptionSelected() && this.selectActiveOption(), t.preventDefault()
}, Autocomplete.prototype.onOptionSpace = function(t) {
    this.isOptionSelected() && (this.selectActiveOption(), t.preventDefault())
}, Autocomplete.prototype.onOptionClick = function(t) {
    var e = $(t.currentTarget);
    this.selectOption(e)
}, Autocomplete.prototype.selectActiveOption = function() {
    var t = this.getActiveOption();
    this.selectOption(t)
}, Autocomplete.prototype.selectOption = function(t) {
    var e = t.attr("data-option-value");
    this.setValue(e), this.hideMenu(), this.focusTextBox()
}, Autocomplete.prototype.onTextBoxDownPressed = function(t) {
    var e, o, i = this.textBox.val().trim();
    0 === i.length || this.isExactMatch(i) ? (o = this.getAllOptions(), this.buildMenu(o), this.showMenu(), e = this.getFirstOption(), this.highlightOption(e)) : (o = this.getOptions(i)).length > 0 && (this.buildMenu(o), this.showMenu(), e = this.getFirstOption(), this.highlightOption(e))
}, Autocomplete.prototype.onOptionDownArrow = function(t) {
    var e = this.getNextOption();
    e[0] && this.highlightOption(e), t.preventDefault()
}, Autocomplete.prototype.onOptionUpArrow = function(t) {
    this.isOptionSelected() && (option = this.getPreviousOption(), option[0] ? this.highlightOption(option) : (this.focusTextBox(), this.hideMenu())), t.preventDefault()
}, Autocomplete.prototype.isOptionSelected = function() {
    return this.activeOptionId
}, Autocomplete.prototype.getActiveOption = function() {
    return $("#" + this.activeOptionId)
}, Autocomplete.prototype.getFirstOption = function() {
    return this.menu.find("li").first()
}, Autocomplete.prototype.getPreviousOption = function() {
    return $("#" + this.activeOptionId).prev()
}, Autocomplete.prototype.getNextOption = function() {
    return $("#" + this.activeOptionId).next()
}, Autocomplete.prototype.highlightOption = function(t) {
    if (this.activeOptionId) {
        this.getOptionById(this.activeOptionId).attr("aria-selected", "false")
    }
    t.attr("aria-selected", "true"), this.isElementVisible(this.menu, t) || this.menu.scrollTop(this.menu.scrollTop() + t.position().top), this.activeOptionId = t[0].id, t.focus()
}, Autocomplete.prototype.getOptionById = function(t) {
    return $("#" + t)
}, Autocomplete.prototype.showMenu = function() {
    this.menu.removeClass("hidden"), this.textBox.attr("aria-expanded", "true")
}, Autocomplete.prototype.hideMenu = function() {
    this.menu.addClass("hidden"), this.textBox.attr("aria-expanded", "false"), this.activeOptionId = null, this.clearOptions()
}, Autocomplete.prototype.clearOptions = function() {
    this.menu.empty()
}, Autocomplete.prototype.getOptions = function(t) {
    var e = [];
    return this.select.find("option").each(function(o, i) {
        ($(i).val().trim().length > 0 && $(i).text().toLowerCase().indexOf(t.toLowerCase()) > -1 || $(i).attr("data-alt") && $(i).attr("data-alt").toLowerCase().indexOf(t.toLowerCase()) > -1) && e.push({
            text: $(i).text(),
            value: $(i).val()
        })
    }), e
}, Autocomplete.prototype.getAllOptions = function() {
    for (var t, e = [], o = this.select.find("option"), i = 0; i < o.length; i++) {
        (t = o.eq(i)).val().trim().length > 0 && e.push({
            text: t.text(),
            value: t.val()
        })
    }
    return e
}, Autocomplete.prototype.isExactMatch = function(t) {
    return this.getMatchingOption(t)
}, Autocomplete.prototype.getMatchingOption = function(t) {
    for (var e = null, o = this.select.find("options"), i = 0; i < o.length; i++)
        if (o[i].text.toLowerCase() === t.toLowerCase()) {
            e = o[i];
            break
        } return e
}, Autocomplete.prototype.buildMenu = function(t) {
    if (this.clearOptions(), this.activeOptionId = null, t.length)
        for (var e = 0; e < t.length; e++) this.menu.append(this.getOptionHtml(e, t[e]));
    else this.menu.append(this.getNoResultsOptionHtml());
    this.menu.scrollTop(this.menu.scrollTop())
}, Autocomplete.prototype.getNoResultsOptionHtml = function() {
    return '<li class="autocomplete-optionNoResults">No results</li>'
}, Autocomplete.prototype.getOptionHtml = function(t, e) {
    return '<li tabindex="-1" aria-selected="false" role="option" data-option-value="' + e.value + '" id="autocomplete-option--' + t + '">' + e.text + "</li>"
}, Autocomplete.prototype.createStatusBox = function() {
    this.status = $('<div aria-live="polite" role="status" class="visually-hidden" />'), this.wrapper.append(this.status)
}, Autocomplete.prototype.updateStatus = function(t) {
    0 === t ? this.status.text("No results.") : this.status.text(t + " results available.")
}, Autocomplete.prototype.hideSelectBox = function() {
    this.select.attr("aria-hidden", "true"), this.select.attr("tabindex", "-1"), this.select.addClass("visually-hidden"), this.select.prop("id", "")
}, Autocomplete.prototype.createTextBox = function() {
    this.textBox = $('<input autocapitalize="none" type="text" autocomplete="off">'), this.textBox.attr("aria-owns", this.getOptionsId()), this.textBox.attr("aria-autocomplete", "list"), this.textBox.attr("role", "combobox"), this.textBox.prop("id", this.select.prop("id"));
    this.select.find("option:selected").val().trim().length > 0 && this.textBox.val(this.select.find("option:selected").text()), this.wrapper.append(this.textBox), this.textBox.on("click", $.proxy(this, "onTextBoxClick")), this.textBox.on("keydown", $.proxy(function(t) {
        switch (t.keyCode) {
            case this.keys.tab:
                this.hideMenu(), this.removeTextBoxFocus()
        }
    }, this)), this.textBox.on("keyup", $.proxy(this, "onTextBoxKeyUp")), this.textBox.on("focus", $.proxy(this, "onTextBoxFocus"))
}, Autocomplete.prototype.getOptionsId = function() {
    return "autocomplete-options--" + this.select.prop("id")
}, Autocomplete.prototype.createArrowIcon = function() {
    var t = $('<svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" fill="none" fill-rule="evenodd"><polygon fill="#000000" points="0 0 22 0 11 17"></polygon></g></svg>');
    this.wrapper.append(t), t.on("click", $.proxy(this, "onArrowClick"))
}, Autocomplete.prototype.onArrowClick = function(t) {
    this.clearOptions();
    var e = this.getAllOptions();
    this.buildMenu(e), this.updateStatus(e.length), this.showMenu(), this.textBox.focus()
}, Autocomplete.prototype.createMenu = function() {
    this.menu = $('<ul id="' + this.getOptionsId() + '" role="listbox" class="hidden"></ul>'), this.wrapper.append(this.menu), this.menu.on("click", "[role=option]", $.proxy(this, "onOptionClick")), this.menu.on("keydown", $.proxy(this, "onMenuKeyDown"))
}, Autocomplete.prototype.isElementVisible = function(t, e) {
    var o = $(t).height(),
        i = $(e).offset().top,
        n = $(t).offset().top,
        s = parseInt($(e).css("padding-top"), 10),
        a = parseInt($(e).css("padding-bottom"), 10),
        r = $(e).height() + s + a;
    return !(i - n < 0 || i - n + r > o)
}, Autocomplete.prototype.getOption = function(t) {
    return this.select.find('option[value="' + t + '"]')
}, Autocomplete.prototype.setValue = function(t) {
    this.select.val(t);
    var e = this.getOption(t).text();
    t.trim().length > 0 ? this.textBox.val(e) : this.textBox.val("")
};

function FormValidator(t, e) {
    this.form = t, this.errors = [], this.validators = [], $(this.form).on("submit", $.proxy(this, "onSubmit")), this.summary = e && e.summary ? $(e.summary) : $(".errorSummary"), this.summary.on("click", "a", $.proxy(this, "onErrorClick")), this.originalTitle = document.title
}
FormValidator.entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;"
}, FormValidator.escapeHtml = function(t) {
    return String(t).replace(/[&<>"'`=\/]/g, function(t) {
        return FormValidator.entityMap[t]
    })
}, FormValidator.prototype.onErrorClick = function(t) {
    t.preventDefault();
    var e = t.target.href,
        o = e.substring(e.indexOf("#"), e.length);
    $(o).focus()
}, FormValidator.prototype.resetTitle = function() {
    document.title = this.originalTitle
}, FormValidator.prototype.updateTitle = function() {
    document.title = "(" + this.errors.length + " errors) - " + document.title
}, FormValidator.prototype.showSummary = function() {
    this.summary.html(this.getSummaryHtml()), this.summary.removeClass("hidden"), this.summary.attr("aria-labelledby", "errorSummary-heading"), this.summary.focus()
}, FormValidator.prototype.getSummaryHtml = function() {
    var t = '<h2 id="errorSummary-heading">There\'s a problem</h2>';
    t += "<ul>";
    for (var e = 0, o = this.errors.length; e < o; e++) {
        var i = this.errors[e];
        t += "<li>", t += '<a href="#' + FormValidator.escapeHtml(i.fieldName) + '">', t += FormValidator.escapeHtml(i.message), t += "</a>", t += "</li>"
    }
    return t += "</ul>"
}, FormValidator.prototype.hideSummary = function() {
    this.summary.addClass("hidden"), this.summary.removeAttr("aria-labelledby")
}, FormValidator.prototype.onSubmit = function(t) {
    this.removeInlineErrors(), this.hideSummary(), this.resetTitle(), this.validate() || (t.preventDefault(), this.updateTitle(), this.showSummary(), this.showInlineErrors())
}, FormValidator.prototype.showInlineErrors = function() {
    for (var t = 0, e = this.errors.length; t < e; t++) this.showInlineError(this.errors[t])
}, FormValidator.prototype.showInlineError = function(t) {
    var e = '<span class="field-error"><svg width="1.5em" height="1.5em"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-icon"></use></svg>' + FormValidator.escapeHtml(t.message) + "</span>",
        o = $("#" + t.fieldName),
        i = o.parents(".field"),
        n = i.find("label"),
        s = i.find("legend");
    i.find(".field-error").remove(), s.length ? (s.append(e), i.attr("aria-invalid", "true")) : (n.append(e), o.attr("aria-invalid", "true"))
}, FormValidator.prototype.removeInlineErrors = function() {
    $(this.form).find(".field-error").remove(), $(this.form).find("[aria-invalid]").attr("aria-invalid", "false")
}, FormValidator.prototype.addValidator = function(t, e) {
    this.validators.push({
        fieldName: t,
        rules: e,
        field: this.form.elements[t]
    })
}, FormValidator.prototype.validate = function() {
    this.errors = [];
    var t, e, o = null;
    for (t = 0; t < this.validators.length; t++)
        for (o = this.validators[t], e = 0; e < o.rules.length; e++)
            if (!o.rules[e].method(o.field, o.rules[e].params)) {
                this.errors.push({
                    fieldName: o.fieldName,
                    message: o.rules[e].message
                });
                break
            } return 0 === this.errors.length
};

function CheckboxCollapser(t, e) {
    this.checkbox = t, this.toggleElement = e, this.check(), this.checkbox.on("click", $.proxy(this, "onCheckboxClick"))
}
CheckboxCollapser.prototype.onCheckboxClick = function(t) {
    this.check()
}, CheckboxCollapser.prototype.check = function() {
    this.checkbox.prop("checked") ? this.toggleElement.addClass("hidden") : this.toggleElement.removeClass("hidden")
};

function CheckboxLimiter(t) {
    this.max = t, this.checkboxes = $(".plane-seat input"), this.checkboxes.on("click", $.proxy(this, "onCheckboxClick")), this.lastChecked = null
}
CheckboxLimiter.prototype.onCheckboxClick = function(t) {
    var e = t.target,
        o = this.checkboxes.filter(":checked");
    o.length > this.max && (o.not(e).not(this.lastChecked)[0].checked = !1), this.lastChecked = e
};

function CharacterCountdown(t, e) {
    this.field = $(t), this.status = $('<div class="indicator" role="status" aria-live="polite" />'), this.setOptions(e), this.updateStatus(this.options.maxLength), this.field.parent().append(this.status), this.field.on("keydown keyup", $.proxy(this, "onChange"))
}
CharacterCountdown.prototype.setOptions = function(t) {
    this.options = $.extend({
        maxLength: 100,
        message: "You have %count% characters remaining."
    }, t)
}, CharacterCountdown.prototype.onChange = function(t) {
    this.updateStatus(this.options.maxLength - this.field.val().length)
}, CharacterCountdown.prototype.updateStatus = function(t) {
    var e = this.options.message.replace(/%count%/, t);
    this.status.html(e)
};

function supportsDateInput() {
    var t = document.createElement("input");
    try {
        t.type = "date"
    } catch (t) {}
    return "date" == t.type
}
if (!supportsDateInput()) {
    var DatePicker = function(t, e) {
        this.input = t, this.container = t.parent(), this.wrapper = $('<div class="datepicker"></div>'), this.container.append(this.wrapper), this.wrapper.append(this.input), e = e || {}, this.setupOptions(e), this.calendarClass = "datepicker", this.setupKeys(), this.setupMonthNames(), this.monthDate = this.options.currentDate, this.selectedDate = null, this.createToggleButton(), this.buildCalendar()
    };
    DatePicker.prototype.setupMonthNames = function() {
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }, DatePicker.prototype.setupOptions = function(t) {
        var e = {};
        e.dateStart = function() {
            var t = new Date;
            return t.setYear(t.getFullYear() - 1), t
        }(), e.dateEnd = function() {
            var t = new Date;
            return t.setYear(t.getFullYear() + 1), t
        }(), e.currentDate = function() {
            var t = new Date;
            return t.setHours(0, 0, 0, 0), t
        }(), this.options = $.extend(e, t)
    }, DatePicker.prototype.getCalendarHtml = function(t, e) {
        var o = '<div class="' + this.calendarClass + '-calendar" aria-label="date picker" role="group">';
        return o += '<div class="' + this.calendarClass + '-actions">', o += '<button type="button" aria-label="previous month"><svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17 17" width="1em" height="1em"><g></g><path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path></svg></button>', o += '<div role="status" aria-live="polite">', o += this.monthNames[e] + " " + t, o += "</div>", o += '<button type="button" aria-label="next month"><svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17 17" width="1em" height="1em"><g></g><path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></path></svg></button>', o += "</div>", o += '<table role="grid">', o += "<thead>", o += "<tr>", o += '<th aria-label="Sunday">Su</th>', o += '<th aria-label="Monday">Mo</th>', o += '<th aria-label="Tuesday">Tu</th>', o += '<th aria-label="Wednesday">We</th>', o += '<th aria-label="Thursday">Th</th>', o += '<th aria-label="Friday">Fr</th>', o += '<th aria-label="Saturday">Sa</th>', o += "</tr>", o += "</thead>", o += "<tbody>", o += this.getCalendarTableRows(e, t), o += "</tbody>", o += "</table>"
    }, DatePicker.prototype.getFirstDateOfMonth = function(t, e) {
        var o = new Date;
        return o.setFullYear(e, t, 1, 0), o.setHours(0, 0, 0, 0), o
    }, DatePicker.prototype.getCalendarTableRows = function(t, e) {
        var o = "<tr>",
            i = new Date;
        i.setFullYear(e, t, 1, 0), i.setHours(0, 0, 0, 0);
        var n = i.getDay(),
            s = 0,
            a = (this.calendarClass, new Date);
        a.setHours(0, 0, 0, 0);
        var r;
        for (r = this.selectedDate && this.selectedDate.getMonth() === i.getMonth() ? this.selectedDate : a.getMonth() === i.getMonth() ? a : new Date(i); s < n;) {
            var h = n - s,
                p = new Date(e, t);
            p.setDate(i.getDate() - h), o += '<td class="datepicker-previousMonthDay">' + p.getDate() + "</td>", s++
        }
        for (var l = s; i.getMonth() == t;) {
            s % 7 == 0 && (o += "</tr><tr>");
            var u = {};
            i.getTime() === a.getTime() && (u.today = !0), r.getTime() === i.getTime() && (u.focusable = !0), this.selectedDate && this.selectedDate.getTime() === i.getTime() && (u.selected = !0), o += this.getCellHtml(i, u), i.setDate(i.getDate() + 1), s++
        }
        for (; s % 7 != 0;) {
            var c = this.getFirstDateOfMonth(t, e);
            c.setDate(c.getDate() + (s - l)), o += '<td class="datepicker-nextMonthDay">' + c.getDate() + "</td>", s++
        }
        return o += "</tr>"
    }, DatePicker.prototype.getCellHtml = function(t, e) {
        var o = t.getDate() + " " + this.monthNames[t.getMonth()] + ", " + t.getFullYear(),
            i = (this.monthNames[t.getMonth()], t.getFullYear(), "");
        e.today && (i += " " + this.calendarClass + "-day-isToday"), e.focusable && (i += " " + this.calendarClass + "-day-isFocused");
        var n = "";
        return n += "<td", e.focusable ? n += ' tabindex="0" ' : n += ' tabindex="-1" ', e.selected ? n += ' aria-selected="true" ' : n += ' aria-selected="false" ', n += ' aria-label="' + o + '" ', n += ' role="gridcell" ', n += ' data-date="' + t.toString() + '" ', n += ' class="' + i + '" ', n += ">", e.today && (n += '<span class="datepicker-today">Today</span>'), n += '<span aria-hidden="true">', n += t.getDate(), n += "</span", n += "</td>"
    }, DatePicker.prototype.buildCalendar = function() {
        this.calendar = $('<div class="' + this.calendarClass + '-wrapper hidden">'), this.calendar.html(this.getCalendarHtml(this.monthDate.getFullYear(), this.monthDate.getMonth())), this.addEventListeners(), this.wrapper.append(this.calendar)
    }, DatePicker.prototype.addEventListeners = function() {
        this.calendar.on("click", "button:first-child", $.proxy(this, "onPreviousClick")), this.calendar.on("click", "button:last-child", $.proxy(this, "onNextClick")), this.calendar.on("click", "[role=gridcell]", $.proxy(this, "onCellClick")), this.calendar.on("keydown", "[role=gridcell]", $.proxy(this, "onCellKeyDown")), this.calendar.on("keydown", $.proxy(this, "onCalendarKeyDown"))
    }, DatePicker.prototype.createToggleButton = function() {
        this.toggleButton = $('<button type="button" aria-haspopup="true">Choose</button>'), this.wrapper.append(this.toggleButton), this.toggleButton.on("click", $.proxy(this, "onToggleButtonClick"))
    }, DatePicker.prototype.onToggleButtonClick = function() {
        "true" == this.toggleButton.attr("aria-expanded") ? this.hide() : (this.show(), this.calendar.find("button:first-child").focus())
    }, DatePicker.prototype.hide = function() {
        this.calendar.addClass("hidden"), this.toggleButton.attr("aria-expanded", "false")
    }, DatePicker.prototype.show = function() {
        this.calendar.removeClass("hidden"), this.toggleButton.attr("aria-expanded", "true")
    }, DatePicker.prototype.setupKeys = function() {
        this.keys = {
            tab: 9,
            enter: 13,
            esc: 27,
            space: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40
        }
    }, DatePicker.prototype.onCalendarKeyDown = function(t) {
        switch (t.keyCode) {
            case this.keys.esc:
                this.hide(), this.toggleButton.focus()
        }
    }, DatePicker.prototype.onCellKeyDown = function(t) {
        switch (t.keyCode) {
            case this.keys.down:
                this.onDayDownPressed(t);
                break;
            case this.keys.up:
                this.onDayUpPressed(t);
                break;
            case this.keys.left:
                this.onDayLeftPressed(t);
                break;
            case this.keys.right:
                this.onDayRightPressed(t);
                break;
            case this.keys.space:
            case this.keys.enter:
                this.onDaySpacePressed(t)
        }
    }, DatePicker.prototype.onCellClick = function(t) {
        var e = new Date($(t.currentTarget).attr("data-date"));
        this.updateTextBoxDate(e), this.hide(), this.input.focus(), this.selectedDate = e, this.selectDate(e)
    }, DatePicker.prototype.onPreviousClick = function(t) {
        this.showPreviousMonth()
    }, DatePicker.prototype.onNextClick = function(t) {
        this.showNextMonth()
    }, DatePicker.prototype.onDaySpacePressed = function(t) {
        t.preventDefault();
        var e = new Date($(t.currentTarget).attr("data-date"));
        this.updateTextBoxDate(e), this.hide(), this.input.focus(), this.selectedDate = e, this.selectDate(e)
    }, DatePicker.prototype.selectDate = function(t) {
        this.calendar.find("[aria-selected=true]").attr("aria-selected", "false"), this.getDayCell(t).attr("aria-selected", "true")
    }, DatePicker.prototype.unhighlightCell = function(t) {
        var e = this.getDayCell(t);
        e.attr("tabindex", "-1"), e.removeClass(this.calendarClass + "-day-isFocused")
    }, DatePicker.prototype.highlightCell = function(t) {
        this.unhighlightCell(this.getFocusedCellDate());
        var e = this.getDayCell(t);
        e.attr("tabindex", "0"), e.addClass(this.calendarClass + "-day-isFocused"), e.focus()
    }, DatePicker.prototype.getFocusedCell = function() {
        return this.calendar.find("." + this.calendarClass + "-day-isFocused")
    }, DatePicker.prototype.getFocusedCellDate = function() {
        return new Date(this.getFocusedCell().attr("data-date"))
    }, DatePicker.prototype.onDayDownPressed = function(t) {
        t.preventDefault();
        var e = this.getFocusedCellDate(),
            o = this.getSameDayNextWeek(e);
        o.getMonth() == e.getMonth() ? this.highlightCell(o) : (this.monthDate = o, this.updateCalendarHtml(o.getFullYear(), o.getMonth()), this.highlightCell(o))
    }, DatePicker.prototype.onDayUpPressed = function(t) {
        t.preventDefault();
        var e = this.getFocusedCellDate(),
            o = this.getSameDayLastWeek(e);
        o.getMonth() == this.monthDate.getMonth() ? this.highlightCell(o) : (this.monthDate = o, this.updateCalendarHtml(o.getFullYear(), o.getMonth()), this.highlightCell(o))
    }, DatePicker.prototype.onDayLeftPressed = function(t) {
        t.preventDefault();
        var e = this.getFocusedCellDate(),
            o = this.getPreviousDay(e);
        o.getMonth() == this.monthDate.getMonth() ? this.highlightCell(o) : (this.monthDate = o, this.updateCalendarHtml(o.getFullYear(), o.getMonth()), this.highlightCell(o))
    }, DatePicker.prototype.onDayRightPressed = function(t) {
        t.preventDefault();
        var e = this.getFocusedCellDate(),
            o = this.getNextDay(e);
        o.getMonth() == this.monthDate.getMonth() ? this.highlightCell(o) : (this.monthDate = o, this.updateCalendarHtml(o.getFullYear(), o.getMonth()), this.highlightCell(o))
    }, DatePicker.prototype.getPreviousDay = function(t) {
        var e = new Date(t);
        return e.setDate(e.getDate() - 1), e
    }, DatePicker.prototype.getSameDayLastWeek = function(t) {
        var e = new Date(t);
        return e.setDate(e.getDate() - 7), e
    }, DatePicker.prototype.getNextDay = function(t) {
        var e = new Date(t);
        return e.setDate(e.getDate() + 1), e
    }, DatePicker.prototype.getSameDayNextWeek = function(t) {
        var e = new Date(t);
        return e.setDate(e.getDate() + 7), e
    }, DatePicker.prototype.getDayCell = function(t) {
        return this.calendar.find('[data-date="' + t.toString() + '"]')
    }, DatePicker.prototype.updateCalendarHtml = function(t, e) {
        this.calendar.find("[role=status]").html(this.monthNames[e] + " " + t), this.calendar.find("tbody").html(this.getCalendarTableRows(e, t))
    }, DatePicker.prototype.updateTextBoxDate = function(t) {
        this.input.val(t.getDate() + "/" + (t.getMonth() + 1) + "/" + t.getFullYear())
    }, DatePicker.prototype.showPreviousMonth = function() {
        var t = this.getPreviousMonth();
        this.monthDate = t, this.updateCalendarHtml(t.getFullYear(), t.getMonth())
    }, DatePicker.prototype.showNextMonth = function() {
        var t = this.getNextMonth();
        this.monthDate = t, this.updateCalendarHtml(t.getFullYear(), t.getMonth())
    }, DatePicker.prototype.getPreviousMonth = function() {
        var t = new Date(this.monthDate.getFullYear(), this.monthDate.getMonth(), 1);
        return t = t.getTime() - 864e5, (t = new Date(t)).setDate(1), t
    }, DatePicker.prototype.getNextMonth = function() {
        var t = new Date(this.monthDate.getFullYear(), this.monthDate.getMonth());
        return t = t.setMonth(t.getMonth() + 1), (t = new Date(t)).setDate(1), t
    }
}

function Menu(t, e) {
    this.container = t, this.menu = this.container.find(".menu-wrapper"), this.menu.attr("role", "menu"), this.container.find(".menu-item").attr("role", "menuitem"), this.mq = e, this.keys = {
        esc: 27,
        up: 38,
        down: 40,
        tab: 9
    }, this.menu.on("keydown", "[role=menuitem]", $.proxy(this, "onButtonKeydown")), this.createToggleButton(), this.setupResponsiveChecks()
}
Menu.prototype.createToggleButton = function() {
    this.menuButton = $('<button type="button" aria-haspopup="true" aria-expanded="false">Actions</button>'), this.menuButton.on("click", $.proxy(this, "onMenuButtonClick")), this.menuButton.on("keydown", $.proxy(this, "onMenuKeyDown"))
}, Menu.prototype.setupResponsiveChecks = function() {
    this.mql = window.matchMedia(this.mq), this.mql.addListener($.proxy(this, "checkMode")), this.checkMode(this.mql)
}, Menu.prototype.checkMode = function(t) {
    t.matches ? this.enableBigMode() : this.enableSmallMode()
}, Menu.prototype.enableSmallMode = function() {
    this.container.prepend(this.menuButton), this.hideMenu()
}, Menu.prototype.enableBigMode = function() {
    this.menuButton.detach(), this.showMenu()
}, Menu.prototype.hideMenu = function() {
    this.menuButton.attr("aria-expanded", "false")
}, Menu.prototype.showMenu = function(t) {
    this.menuButton.attr("aria-expanded", "true")
}, Menu.prototype.onMenuButtonClick = function() {
    this.toggle()
}, Menu.prototype.toggle = function() {
    "false" == this.menuButton.attr("aria-expanded") ? (this.showMenu(), this.menu.find("input").first().focus()) : (this.hideMenu(), this.menuButton.focus())
}, Menu.prototype.onMenuKeyDown = function(t) {
    switch (t.keyCode) {
        case this.keys.down:
            this.toggle()
    }
}, Menu.prototype.onButtonKeydown = function(t) {
    switch (t.keyCode) {
        case this.keys.up:
            t.preventDefault(), this.focusPrevious(t.currentTarget);
            break;
        case this.keys.down:
            t.preventDefault(), this.focusNext(t.currentTarget);
            break;
        case this.keys.esc:
            this.mq.matches || (this.menuButton.focus(), this.hideMenu());
            break;
        case this.keys.tab:
            this.mq.matches || this.hideMenu()
    }
}, Menu.prototype.focusNext = function(t) {
    var e = $(t).next();
    e[0] ? e.focus() : this.container.find("input").first().focus()
}, Menu.prototype.focusPrevious = function(t) {
    var e = $(t).prev();
    e[0] ? e.focus() : this.container.find("input").last().focus()
};

function AddAnother(t) {
    this.container = $(t), this.container.on("click", ".addAnother-removeButton", $.proxy(this, "onRemoveButtonClick")), this.container.on("click", ".addAnother-addButton", $.proxy(this, "onAddButtonClick")), this.container.find(".addAnother-removeButton").replaceWith('<button type="button" class="secondaryButton addAnother-removeButton">Remove</button>'), this.container.find(".addAnother-addButton").replaceWith('<button type="button" class="secondaryButton addAnother-addButton">Add another</button>')
}
AddAnother.prototype.onAddButtonClick = function(t) {
    var e = this.getNewItem();
    this.updateAttributes(this.getItems().length, e), this.resetItem(e);
    var o = this.getItems().first();
    this.hasRemoveButton(o) || this.createRemoveButton(o), this.getItems().last().after(e), e.find("input, textarea, select").first().focus()
}, AddAnother.prototype.hasRemoveButton = function(t) {
    return t.find(".addAnother-removeButton").length
}, AddAnother.prototype.getItems = function() {
    return this.container.find(".addAnother-item")
}, AddAnother.prototype.getNewItem = function() {
    var t = this.getItems().first().clone();
    return this.hasRemoveButton(t) || this.createRemoveButton(t), t
}, AddAnother.prototype.updateAttributes = function(t, e) {
    e.find("[data-name]").each(function(e, o) {
        o.name = $(o).attr("data-name").replace(/%index%/, t), o.id = $(o).attr("data-id").replace(/%index%/, t), ($(o).prev("label")[0] || $(o).parents("label")[0]).htmlFor = o.id
    })
}, AddAnother.prototype.createRemoveButton = function(t) {
    t.append('<button type="button" class="secondaryButton addAnother-removeButton">Remove</button>')
}, AddAnother.prototype.resetItem = function(t) {
    t.find("[data-name], [data-id]").each(function(t, e) {
        "checkbox" == e.type || "radio" == e.type ? e.checked = !1 : e.value = ""
    })
}, AddAnother.prototype.onRemoveButtonClick = function(t) {
    $(t.currentTarget).parents(".addAnother-item").remove();
    var e = this.getItems();
    1 === e.length && e.find(".addAnother-removeButton").remove(), e.each($.proxy(function(t, e) {
        this.updateAttributes(t, $(e))
    }, this)), this.focusHeading()
}, AddAnother.prototype.focusHeading = function() {
    this.container.find(".addAnother-heading").focus()
};

function dragAndDropSupported() {
    return void 0 !== document.createElement("div").ondrop
}

function formDataSupported() {
    return "function" == typeof FormData
}

function fileApiSupported() {
    var t = document.createElement("input");
    return t.type = "file", void 0 !== t.files
}
if (dragAndDropSupported() && formDataSupported() && fileApiSupported()) {
    var Dropzone = function(t) {
        this.dropzone = t, this.dropzone.addClass("dropzone-enhanced"), this.setupDropzone(), this.setupFileInput(), this.setupStatusBox(), $(".files").on("click", ".file-remove", $.proxy(this, "onFileRemoveClick"))
    };
    Dropzone.prototype.setupDropzone = function() {
        this.dropzone.find("label").html("Upload file"), this.dropzone.on("dragover", $.proxy(this, "onDragOver")), this.dropzone.on("dragleave", $.proxy(this, "onDragLeave")), this.dropzone.on("drop", $.proxy(this, "onDrop"))
    }, Dropzone.prototype.onFileRemoveClick = function(t) {
        $(t.target).parent().remove()
    }, Dropzone.prototype.setupFileInput = function() {
        this.fileInput = this.dropzone.find("[type=file]"), this.fileInput.on("change", $.proxy(this, "onFileChange")), this.fileInput.on("focus", $.proxy(this, "onFileFocus")), this.fileInput.on("blur", $.proxy(this, "onFileBlur"))
    }, Dropzone.prototype.setupStatusBox = function() {
        this.status = $('<div aria-live="polite" role="status" class="visually-hidden" />'), this.dropzone.append(this.status)
    }, Dropzone.prototype.onDragOver = function(t) {
        t.preventDefault(), this.dropzone.addClass("dropzone-dragover")
    }, Dropzone.prototype.onDragLeave = function() {
        this.dropzone.removeClass("dropzone-dragover")
    }, Dropzone.prototype.onDrop = function(t) {
        t.preventDefault(), this.dropzone.removeClass("dropzone-dragover"), $(".files").removeClass("hidden"), this.status.html("Uploading files, please wait."), this.uploadFiles(t.originalEvent.dataTransfer.files)
    }, Dropzone.prototype.uploadFiles = function(t) {
        for (var e = 0; e < t.length; e++) this.uploadFile(t[e])
    }, Dropzone.prototype.onFileChange = function(t) {
        $(".files").removeClass("hidden"), this.status.html("Uploading files, please wait."), this.uploadFiles(t.currentTarget.files)
    }, Dropzone.prototype.onFileFocus = function(t) {
        this.dropzone.find("label").addClass("dropzone-focused")
    }, Dropzone.prototype.onFileBlur = function(t) {
        this.dropzone.find("label").removeClass("dropzone-focused")
    }, Dropzone.prototype.getSuccessHtml = function(t) {
        var e = '<a class="file-name" href="/' + t.path + '">' + t.originalname + "</a>";
        return e += '<span class="success"><svg width="1.5em" height="1.5em"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tick"></use></svg>File uploaded</span>', e += '<button type="button" class="file-remove">Remove</button>'
    }, Dropzone.prototype.getErrorHtml = function(t) {
        var e = '<span class="file-name">' + t.file.originalname + "</span>";
        return e += '<span class="error"><svg width="1.5em" height="1.5em"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-icon"></use></svg>' + t.text + "</span>", e += '<button type="button" class="file-remove">Remove</button>'
    }, Dropzone.prototype.uploadFile = function(t) {
        var e = new FormData;
        e.append("documents", t);
        var o = $('<li><span class="file-name">' + e.get("documents").name + '</span><progress value="0" max="100">0%</progress></li>');
        $(".files ul").append(o), $.ajax({
            url: "/ajax-upload",
            type: "post",
            data: e,
            processData: !1,
            contentType: !1,
            success: $.proxy(function(t) {
                t.error ? (o.html(this.getErrorHtml(t.error)), this.status.html(t.error)) : (o.html(this.getSuccessHtml(t.file)), this.status.html(t.file.originalname + " has been uploaded."))
            }, this),
            xhr: function() {
                var t = new XMLHttpRequest;
                return t.upload.addEventListener("progress", function(t) {
                    if (t.lengthComputable) {
                        var e = t.loaded / t.total;
                        e = parseInt(100 * e), o.find("progress").prop("value", e).text(e + "%")
                    }
                }, !1), t
            }
        })
    }
}

function SearchForm() {
    this.header = $("header"), this.form = $(".searchForm"), this.form.addClass("hidden"), this.createButton()
}
SearchForm.prototype.createButton = function() {
    this.button = $('<button type="button" aria-haspopup="true" aria-expanded="false"><img src="/public/img/magnifying-glass.67b00e41.png" width="16" height="16" alt="Search products"></button>'), this.button.on("click", $.proxy(this, "onButtonClick")), this.header.append(this.button)
}, SearchForm.prototype.onButtonClick = function() {
    "false" == this.button.attr("aria-expanded") ? (this.button.attr("aria-expanded", "true"), this.form.removeClass("hidden"), this.form.find("input").first().focus()) : (this.form.addClass("hidden"), this.button.attr("aria-expanded", "false"))
};

function PasswordRevealer(t) {
    this.el = t, $(this.el).wrap('<div class="passwordRevealer"></div>'), this.container = $(this.el).parent(), this.createButton()
}
PasswordRevealer.prototype.createButton = function() {
    this.button = $('<button type="button">Show</button>'), this.container.append(this.button), this.button.on("click", $.proxy(this, "onButtonClick"))
}, PasswordRevealer.prototype.onButtonClick = function() {
    "password" === this.el.type ? (this.el.type = "text", this.button.text("Hide")) : (this.el.type = "password", this.button.text("Show"))
};

function FilterCollapser(t) {
    this.fieldset = t, this.options = this.fieldset.find(".field-options"), this.legend = this.fieldset.find("legend"), this.createButton(), this.hide()
}
FilterCollapser.prototype.createButton = function() {
    this.button = $('<button type="button" aria-expanded="true">' + this.legend.text() + '<svg viewBox="0 0 10 10" aria-hidden="true" focusable="false"><rect class="vert" height="8" width="2" y="1" x="4" /> <rect height="2" width="8" y="4" x="1" /></svg></button>'), this.button.on("click", $.proxy(this, "onButtonClick")), this.legend.html(this.button)
}, FilterCollapser.prototype.onButtonClick = function(t) {
    this["true" == this.button.attr("aria-expanded") ? "hide" : "show"]()
}, FilterCollapser.prototype.hide = function() {
    this.button.attr("aria-expanded", "false"), this.options.addClass("hidden")
}, FilterCollapser.prototype.show = function() {
    this.button.attr("aria-expanded", "true"), this.options.removeClass("hidden")
};

function FilterRequester() {
    this.url = "/examples/filter-form", this.form = $(".filter form"), this.products = $(".products"), this.createStatusBox(), this.form.find("input").on("change", $.proxy(this, "onInputChange")), $(window).on("popstate", $.proxy(this, "onPopState")), this.form.find("[type=submit]").addClass("visually-hidden").attr("tabindex", "-1"), history.replaceState({
        query: "",
        productsHtml: JSON.stringify($(".products").html())
    }, null, this.url)
}
FilterRequester.prototype.createStatusBox = function() {
    this.status = $('<div aria-live="polite" role="status" class="visually-hidden" />'), this.form.append(this.status)
}, FilterRequester.prototype.updateStatusBox = function(t) {
    this.status.text(t)
}, FilterRequester.prototype.showLoadingIndicator = function() {
    this.loadingText = $('<div class="progress"><div>Loading…</div></div>'), this.products.append(this.loadingText)
}, FilterRequester.prototype.hideLoadingIndicator = function() {
    this.loadingText.remove()
}, FilterRequester.prototype.onInputChange = function(t) {
    var e = this.form.serialize();
    this.requestResults(e)
}, FilterRequester.prototype.requestResults = function(t) {
    this.updateStatusBox("Loading products"), this.showLoadingIndicator(), $.ajax({
        url: this.url,
        type: "get",
        data: t,
        success: $.proxy(this, "onRequestSuccess", t)
    })
}, FilterRequester.prototype.onRequestSuccess = function(t, e) {
    history.pushState(e, null, this.url + "?" + t), this.updateStatusBox("Products loaded"), this.renderUpdates(e)
}, FilterRequester.prototype.renderUpdates = function(t) {
    this.updateFilterForm(t.query), this.products.html(JSON.parse(t.productsHtml))
}, FilterRequester.prototype.updateFilterForm = function(t) {
    this.form.find("input[type=radio], input[type=checkbox]").prop("checked", !1), Object.keys(t).forEach(function(e) {
        var o = t[e];
        $.isArray(o) ? o.forEach(function(t) {
            $(".filter [name=" + e + "]").each(function(e, o) {
                o.value == t && (o.checked = !0)
            })
        }) : $(".filter [name=" + e + "]").each(function(t, e) {
            e.value == o && (e.checked = !0)
        })
    })
}, FilterRequester.prototype.onPopState = function(t) {
    var e = t.originalEvent.state;
    this.renderUpdates(e)
};

function FilterMenu(t) {
    this.container = $(".filter"), this.setupOptions(t), this.createToggleButton(), this.setupResponsiveChecks()
}
FilterMenu.prototype.setupOptions = function(t) {
    (t = t || {}).mq = t.mq || "(min-width: 50em)", this.options = t
}, FilterMenu.prototype.setupResponsiveChecks = function() {
    this.mq = window.matchMedia(this.options.mq), this.mq.addListener($.proxy(this, "checkMode")), this.checkMode(this.mq)
}, FilterMenu.prototype.createToggleButton = function() {
    this.menuButton = $('<button class="filter-button secondaryButton" type="button" aria-haspopup="true" aria-expanded="false">Filter...</button>'), this.menuButton.on("click", $.proxy(this, "onMenuButtonClick"))
}, FilterMenu.prototype.checkMode = function(t) {
    t.matches ? this.enableBigMode() : this.enableSmallMode()
}, FilterMenu.prototype.enableSmallMode = function() {
    this.container.prepend(this.menuButton), this.hideMenu(), this.addCloseButton()
}, FilterMenu.prototype.addCloseButton = function() {
    var t = $(".filter-wrapper");
    this.closeButton = $('<button class="filter-close" type="button" aria-label="close filters" aria-hidden="true" focusable="false"><svg viewBox="0 0 10 10"><path d="m7.1 1.4 1.4 1.4-5.6 5.6-1.4-1.4zm-4.2 0l5.6 5.6-1.4 1.4-5.6-5.6z"/></svg></button>'), this.closeButton.on("click", $.proxy(this, "onCloseClick")), t.prepend(this.closeButton)
}, FilterMenu.prototype.onCloseClick = function() {
    this.hideMenu(), this.menuButton.focus()
}, FilterMenu.prototype.enableBigMode = function() {
    this.menuButton.detach(), this.showMenu(), this.closeButton && this.closeButton.remove()
}, FilterMenu.prototype.hideMenu = function() {
    this.menuButton.attr("aria-expanded", "false")
}, FilterMenu.prototype.showMenu = function() {
    this.menuButton.attr("aria-expanded", "true")
}, FilterMenu.prototype.onMenuButtonClick = function() {
    this.toggle(), this.closeButton.focus()
}, FilterMenu.prototype.toggle = function() {
    "false" == this.menuButton.attr("aria-expanded") ? this.showMenu() : this.hideMenu()
};
